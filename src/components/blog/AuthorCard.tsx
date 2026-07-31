import { Link } from "react-router-dom";
import type { User } from "../../lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  useToggleFollowUser,
  useUserProfile,
  usePublicProfile
} from "../../hooks/user/useUserProfile";
import { useAuthStore } from "../../store/useAuthStore";
import { Spinner } from "../loading/Spinner";

interface AuthorCardProps {
  author: User;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const { mutate: followAuthor, isPending } = useToggleFollowUser();
  const { data } = useUserProfile();
  const {data:publicUser} = usePublicProfile(author._id)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const user = data?.user;
  const canFollow = isAuthenticated && user?.id !== author._id;

  console.log(canFollow);
  const handleFollow = () => {
    if (!user) return;
    followAuthor(author._id);
  };

  return (
    <section className="my-12">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-16 w-16 border border-border sm:h-18 sm:w-18">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="font-serif text-lg font-semibold">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <Link
                to={`/author/${author._id}/profile`}
                className="block font-serif text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-2xl"
              >
                {author.name}
              </Link>

              <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground sm:mx-0 sm:max-w-md">
                {author.bio ||
                  "Sharing ideas, experiences and knowledge with the community."}
              </p>
            </div>
          </div>

          {canFollow && (
            <Button
              size="sm"
              onClick={handleFollow}
              className="w-full sm:w-auto sm:min-w-28"
            >
              {isPending && <Spinner />}
              {publicUser?.isFollowing ? "Following":"Follow"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
