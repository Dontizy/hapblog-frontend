import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Bell } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useMarkNotification } from "../../hooks/user/useActivity";
import type { NotificationsResponse } from "../../lib/activity";

// Adjust this import to wherever your Notification type actually lives.


export default function NotificationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: markAsRead } = useMarkNotification();

  // Pull the notification straight out of the already-fetched list —
  // no extra network round trip needed since the list is cached.
  const cached = queryClient.getQueryData<NotificationsResponse>([
    "notifications",
  ]);
  const notification = cached?.notifications.find((n) => n._id === id);

  useEffect(() => {
    if (notification && !notification.isRead) {
      markAsRead(notification._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification?._id]);

  if (!id) {
    return null;
  }

  if (!notification) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Couldn't find this notification. It may have loaded before you
          visited this page — try going back to your notifications.
        </p>
        <Button variant="outline" onClick={() => navigate("/notifications")}>
          Back to notifications
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-16 pt-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>

      <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-3">
          {notification.sender ? (
            <Link to={`/author/${notification.sender.username}/profile`}>
              <Avatar className="size-11 shrink-0">
                <AvatarImage
                  src={notification.sender.avatar}
                  alt={notification.sender.name}
                />
                <AvatarFallback>
                  {notification.sender.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary/60">
              <Bell className="size-5 text-muted-foreground" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            {notification.sender ? (
              <Link
                to={`/author/${notification.sender.username}/profile`}
                className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                {notification.sender.name}
              </Link>
            ) : (
              <span className="text-sm font-semibold text-foreground">
                Announcement
              </span>
            )}
            <p className="mt-0.5 text-xs text-muted-foreground">
              {new Date(notification.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <h1 className="mt-5 font-serif text-xl font-bold tracking-tight text-foreground">
          {notification.title}
        </h1>

        <p className="mt-3 whitespace-pre-wrap leading-7 text-foreground">
          {notification.message}
        </p>
      </article>
    </div>
  );
}
