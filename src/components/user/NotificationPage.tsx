import { Link } from "react-router-dom";
import { Heart, MessageCircle, Reply, UserPlus, Megaphone, PartyPopper } from "lucide-react";
import { useNotification, useMarkNotification } from "../../hooks/user/useActivity";
import type { Notification, NotificationType } from "../../lib/activity";
import { formatDate } from "../../lib/date-data";

const ICONS: Record<NotificationType, typeof Heart> = {
  blog_like: Heart,
  comment: MessageCircle,
  reply: Reply,
  reply_like: Heart,
  comment_like: Heart,
  follow: UserPlus,
  announcement: Megaphone,
  welcome: PartyPopper,
};

function messageFor(n: Notification) {
  switch (n.type) {
    case "blog_like":
      return n.blog ? (
        <>liked your post <span className="font-medium text-foreground">{n.blog.title}</span></>
      ) : (
        "liked your post"
      );
    case "comment":
      return n.blog ? (
        <>commented on <span className="font-medium text-foreground">{n.blog.title}</span></>
      ) : (
        "commented on your post"
      );
    case "comment_like":
      return "liked your comment";
    case "reply":
      return "replied to your comment";
    case "reply_like":
      return "liked your reply";
    case "follow":
      return "started following you";
    case "welcome":
      return <span className="font-medium text-foreground">{n.title}</span>;
    case "announcement":
      return n.title ? (
        <>posted an announcement: <span className="font-medium text-foreground">{n.title}</span></>
      ) : (
        "posted an announcement"
      );
    default:
      return "";
  }
}

function linkFor(n: Notification) {
  if (n.type === "announcement" || n.type === "welcome")
    return `/notification/${n._id}/detail`;
  if (n.blog) return `/feed/${n.blog._id}`;
  if (n.type === "follow") return `/author/${n.sender?.username}/profile`;
  return "#";
}

export default function NotificationsPage() {
  const { data, isLoading, isError } = useNotification();
  const { mutate } = useMarkNotification();

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Notifications
        </h1>

        {isLoading && (
          <p className="mt-8 text-sm text-muted-foreground">Loading notifications…</p>
        )}

        {isError && (
          <p className="mt-8 text-sm text-muted-foreground">
            Couldn't load your notifications. Try refreshing the page.
          </p>
        )}

        {data && data.notifications.length === 0 && (
          <div className="mt-16 flex flex-col items-center text-center">
            <p className="text-sm text-muted-foreground">
              Nothing here yet — likes, comments, and follows will show up as they happen.
            </p>
          </div>
        )}

        {data && data.notifications.length > 0 && (
          <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
            {data.notifications.map((n) => {
              const Icon = ICONS[n.type];
              return (
                <li key={n._id}>
                  <Link
                    onClick={() => mutate(n._id)}
                    to={linkFor(n)}
                    className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-secondary"
                  >
                    <div className="relative shrink-0">
                      {n.sender ? (
                        <img
                          src={n.sender.avatar}
                          alt={n.sender.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card ring-2 ring-card">
                        <Icon className="h-3 w-3 text-accent" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug text-muted-foreground">
                        {n.sender && (
                          <span className="font-medium text-foreground">{n.sender.name}</span>
                        )}{" "}
                        {messageFor(n)}
                      </p>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {formatDate(n.createdAt)}
                      </span>
                    </div>

                    {!n.isRead && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
