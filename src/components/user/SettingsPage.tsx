import { useRef, useState } from "react";
import { Camera, Pencil, X, ArrowLeft} from "lucide-react";
import { Button } from "../ui/button";
import { useUserProfile } from "../../hooks/user/useUserProfile";
import { useUpdateAvatar } from "../../hooks/user/useUpdateProfile";
import { useUpdateBio } from "../../hooks/user/useUpdateProfile";
import { useChangePassword } from "../../hooks/user/useUpdateProfile";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { data } = useUserProfile();
  const user = data?.user;
  const navigate = useNavigate();
  // --- Avatar (its own endpoint, uploads immediately on selection) ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { mutate: saveAvatar, isPending: isSavingAvatar } = useUpdateAvatar();

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    saveAvatar({ avatar: file });
  };

  // --- Bio (its own endpoint, own toggle) ---
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState("");

  const { mutate: saveBio, isPending: isSavingBio } = useUpdateBio();

  // Hydrate once when the profile first loads. Done during render (not in an
  // effect) per React's guidance for "adjusting state when data changes" —
  // calling setState in an effect body here causes an extra, avoidable render pass.
  const [hydratedFromUser, setHydratedFromUser] =
    useState<typeof user>(undefined);
  if (user && user !== hydratedFromUser) {
    setHydratedFromUser(user);
    setBio(user.bio ?? "");
    setAvatarPreview(user.avatar ?? null);
  }

  const handleSaveBio = () => {
    saveBio(
      { bio },
      {
        onSuccess: () => setIsEditingBio(false),
      },
    );
  };

  // --- Password (its own endpoint, own toggle) ---
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: savePassword, isPending: isSavingPassword } =
    useChangePassword();

  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;
  const canSubmitPassword =
    oldPassword.length > 0 && newPassword.length >= 8 && passwordsMatch;

  const resetPasswordForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSavePassword = () => {
    if (!canSubmitPassword) return;
    savePassword(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          resetPasswordForm();
          setIsChangingPassword(false);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-xl space-y-10">
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="font-serif text-2xl font-semibold tracking-tight">
              Settings
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your account settings.
            </p>
          </div>
        </div>

        {/* Photo + bio card — avatar acts immediately, bio has its own toggle */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Profile
          </h2>

          <div className="mt-6 flex items-center gap-5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSavingAvatar}
              className="group relative disabled:opacity-70"
              aria-label="Change profile photo"
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="h-20 w-20 rounded-full object-cover ring-1 ring-border"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-secondary" />
              )}
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-transparent transition-colors group-hover:bg-black/40 group-hover:text-white">
                <Camera className="h-5 w-5" />
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              className="hidden"
            />
            <div className="text-sm text-muted-foreground">
              {isSavingAvatar
                ? "Uploading…"
                : "Click the photo to upload a new one."}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            {!isEditingBio ? (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Bio</div>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    {user?.bio || "No bio added yet."}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 shrink-0"
                  onClick={() => setIsEditingBio(true)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Bio
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setBio(user?.bio ?? "");
                      setIsEditingBio(false);
                    }}
                    aria-label="Cancel"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  maxLength={280}
                  autoFocus
                  placeholder="Tell readers a little about yourself…"
                  className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="mt-1 text-right text-xs text-muted-foreground">
                  {bio.length}/280
                </div>

                <div className="mt-3 flex justify-end">
                  <Button onClick={handleSaveBio} disabled={isSavingBio}>
                    {isSavingBio ? "Saving…" : "Save bio"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Password card — collapsed by default */}
        <section className="rounded-2xl border border-border bg-card p-6">
          {!isChangingPassword ? (
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
                  Password
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Change the password used to sign in.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => setIsChangingPassword(true)}
              >
                Change password
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
                  Change password
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    resetPasswordForm();
                    setIsChangingPassword(false);
                  }}
                  aria-label="Cancel"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm text-muted-foreground">
                    Current password
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    autoFocus
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-muted-foreground">
                    New password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-muted-foreground">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="mt-1.5 text-xs text-destructive">
                      Passwords don't match.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleSavePassword}
                  disabled={!canSubmitPassword || isSavingPassword}
                >
                  {isSavingPassword ? "Updating…" : "Update password"}
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
