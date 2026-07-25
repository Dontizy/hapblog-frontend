import { Link } from "react-router-dom";

import type { User } from "../../lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface AuthorCardProps {
  author: User;
}

export default function AuthorCard({
  author,
}: AuthorCardProps) {
  return (
    <section className="my-12">
  <div className="overflow-hidden rounded-2xl border border-border bg-card">
    <div className="p-5 sm:p-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        {/* Author Info */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-16 w-16 border-2 border-background shadow-md sm:h-20 sm:w-20">
            <AvatarImage
              src={author.avatar}
              alt={author.name}
            />

            <AvatarFallback className="text-lg font-semibold">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <Link
              to={`/profile/${author._id}`}
              className="block text-xl font-bold transition-colors hover:text-primary sm:text-2xl"
            >
              {author.name}
            </Link>

            <p className="mx-auto max-w-xs text-sm leading-6 text-muted-foreground sm:mx-0 sm:max-w-md sm:text-base">
              {author.bio ||
                "Sharing ideas, experiences and knowledge with the community."}
            </p>
          </div>
        </div>

        {/* Follow Button */}
        <Button
          size="sm"
          className="mt-5 w-full sm:mt-0 sm:w-auto sm:min-w-28"
        >
          Follow
        </Button>
      </div>
    </div>
  </div>
</section>
  );
}
