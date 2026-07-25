import type {
  AppNotification,
  Comment,
  Post,
  User,
} from './types'

export const users: User[] = [
  {
    id: 'u1',
    name: 'Elena Marsh',
    username: 'elenamarsh',
    email: 'elena@inkwell.io',
    avatar: '/avatars/elena.png',
    bio: 'Design systems lead. Writing about the craft of interfaces and the teams that build them.',
    role: 'admin',
    joinedAt: '2023-02-14',
    followers: 12400,
    following: 182,
  },
  {
    id: 'u2',
    name: 'Marcus Bell',
    username: 'marcusbell',
    email: 'marcus@inkwell.io',
    avatar: '/avatars/marcus.png',
    bio: 'Engineer and essayist. Thinking out loud about software, systems, and focus.',
    role: 'user',
    joinedAt: '2023-05-01',
    followers: 8300,
    following: 210,
  },
  {
    id: 'u3',
    name: 'Aiko Tanaka',
    username: 'aikotanaka',
    email: 'aiko@inkwell.io',
    avatar: '/avatars/aiko.png',
    bio: 'Writer exploring mindfulness, slow living, and the quiet parts of a creative life.',
    role: 'user',
    joinedAt: '2023-08-22',
    followers: 5600,
    following: 95,
  },
  {
    id: 'u4',
    name: 'Sam Rivera',
    username: 'samrivera',
    email: 'sam@inkwell.io',
    avatar: '/avatars/sam.png',
    bio: 'Founder. Sharing the messy, honest reality of building a company from scratch.',
    role: 'user',
    joinedAt: '2024-01-09',
    followers: 3100,
    following: 140,
  },
]

// The currently "signed in" user for mock auth.
export const currentUserId = 'u1'

export const posts: Post[] = [
  {
    id: 'p1',
    slug: 'designing-systems-that-scale',
    title: 'Designing Systems That Scale With Your Team',
    excerpt:
      'A design system is never finished. It is a living contract between design and engineering — here is how to keep it healthy as your team grows.',
    content: `A design system is never finished. It is a living contract between design and engineering, and like any contract it needs maintenance, negotiation, and trust.

When we started, our system was a single Figma file and a folder of React components. It worked because there were four of us. The moment we hit twenty contributors, every assumption broke.

## Start with primitives, not pages

The teams that struggle most are the ones that ship "the marketing page kit" or "the dashboard kit." Components built for a specific screen are dead on arrival the moment the screen changes. Instead, invest in primitives: spacing, color, typography, and a small set of truly generic components.

## Document the why, not just the what

Anyone can read a prop table. What they cannot reverse-engineer is the reasoning. Why does the button only come in three sizes? Why is there no "danger ghost" variant? Write it down, and you save a hundred Slack threads.

## Make the right thing the easy thing

If using the system is slower than going around it, people will go around it. Tokens, linting, and good defaults are not bureaucracy — they are how you make quality the path of least resistance.

The reward for all of this is compounding. Every team that adopts the system makes the next adoption cheaper, and eventually the system stops being a project and becomes infrastructure.`,
    coverImage: '/covers/design-systems.png',
    tags: ['Design', 'Engineering', 'Teams'],
    authorId: 'u1',
    publishedAt: '2025-05-18',
    readingMinutes: 6,
    likeCount: 482,
    commentCount: 2,
    liked: false,
    bookmarked: true,
  },
  {
    id: 'p2',
    slug: 'the-quiet-discipline-of-deep-work',
    title: 'The Quiet Discipline of Deep Work',
    excerpt:
      'Focus is not a personality trait. It is a practice you build, defend, and occasionally lose — then build again.',
    content: `Focus is not a personality trait. It is a practice, and like any practice it can be built, defended, and rebuilt after it collapses.

I used to believe I simply was not a focused person. The truth was duller: I had never protected the conditions that focus requires.

## Subtraction beats willpower

The most effective thing I did was not adding a productivity app. It was removing things — notifications, open tabs, the second monitor that was always showing chat. Focus is mostly the absence of interruption.

## Sessions, not marathons

Ninety minutes of genuine attention beats a six-hour blur. I work in sessions with a clear question to answer, and I stop before I am empty.

The discipline is quiet because no one applauds it. But it is the difference between a year of motion and a year of progress.`,
    coverImage: '/covers/remote-work.png',
    tags: ['Productivity', 'Focus', 'Work'],
    authorId: 'u2',
    publishedAt: '2025-05-12',
    readingMinutes: 5,
    likeCount: 327,
    commentCount: 1,
    liked: true,
    bookmarked: false,
  },
  {
    id: 'p3',
    slug: 'writing-with-ai-not-instead-of-it',
    title: 'Writing With AI, Not Instead of It',
    excerpt:
      'The interesting question is not whether AI can write for you. It is what kind of writer you become when it can.',
    content: `The interesting question is not whether AI can write for you. It can, badly, in the average. The interesting question is what kind of writer you become when it can.

## A tool for the blank page

The blank page is where most writing dies. Using a model to generate a dozen bad openings is liberating precisely because they are bad — they give you something to react against.

## Taste is the bottleneck

When generating text is free, the scarce skill becomes judgment. Knowing which sentence is alive and which is filler is now the entire job.

Used well, these tools do not replace the writer. They replace the excuses.`,
    coverImage: '/covers/ai-writing.png',
    tags: ['AI', 'Writing', 'Craft'],
    authorId: 'u1',
    publishedAt: '2025-05-04',
    readingMinutes: 4,
    likeCount: 611,
    commentCount: 0,
    liked: false,
    bookmarked: false,
  },
  {
    id: 'p4',
    slug: 'a-love-letter-to-typography',
    title: 'A Love Letter to Typography',
    excerpt:
      'Type is the voice of the written word. Most readers will never notice it — which is exactly the point.',
    content: `Type is the voice of the written word. When it is good, most readers will never notice it, and that invisibility is the entire craft.

## Rhythm is everything

Good typography is mostly about rhythm: the measure of a line, the space between lines, the relationship between sizes. Get the rhythm right and a page feels effortless.

## Restraint is a feature

The temptation is always to add another weight, another family, another flourish. The best typographic work usually comes from removing, not adding.

Read enough beautifully set text and you start to hear it. That is when you know the voice is working.`,
    coverImage: '/covers/typography.png',
    tags: ['Design', 'Typography'],
    authorId: 'u3',
    publishedAt: '2025-04-27',
    readingMinutes: 4,
    likeCount: 254,
    commentCount: 0,
    liked: false,
    bookmarked: true,
  },
  {
    id: 'p5',
    slug: 'what-nobody-tells-you-about-year-one',
    title: 'What Nobody Tells You About Year One',
    excerpt:
      'The first year of a company is not a highlight reel. It is a slow accumulation of small, unglamorous decisions.',
    content: `The first year of a company is not a highlight reel. It is a slow accumulation of small, unglamorous decisions, most of which no one will ever see.

## Momentum is fragile

Early on, momentum is the only asset you have, and it is shockingly easy to lose. A week of indecision can undo a month of progress.

## Talk to people who use the thing

Every time I felt lost, the cure was the same: talk to the people actually using the product. Strategy is mostly listening with a notebook.

Year one is survived, not won. Surviving it well is the whole game.`,
    coverImage: '/covers/startup.png',
    tags: ['Startups', 'Founders'],
    authorId: 'u4',
    publishedAt: '2025-04-19',
    readingMinutes: 5,
    likeCount: 198,
    commentCount: 0,
    liked: true,
    bookmarked: false,
  },
  {
    id: 'p6',
    slug: 'the-case-for-doing-less',
    title: 'The Case for Doing Less',
    excerpt:
      'We treat busyness as a proxy for value. Slow living is the quiet rebellion against that lie.',
    content: `We treat busyness as a proxy for value, as if a full calendar were the same as a full life. Slow living is the quiet rebellion against that lie.

## Margin is where life happens

The best moments rarely happen inside a scheduled block. They happen in the margin — the unplanned hour, the slow morning, the walk with no destination.

## Less, but better

Doing less is not laziness. It is the decision to spend your finite attention on the few things that actually matter to you.

Choose less, and choose it on purpose.`,
    coverImage: '/covers/mindful.png',
    tags: ['Mindfulness', 'Life'],
    authorId: 'u3',
    publishedAt: '2025-04-10',
    readingMinutes: 3,
    likeCount: 143,
    commentCount: 0,
    liked: false,
    bookmarked: false,
  },
]

export const comments: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    authorId: 'u2',
    body: 'The "document the why" point hit home. We just spent a whole sprint re-litigating decisions we had already made — because none of them were written down.',
    createdAt: '2025-05-18T14:20:00Z',
    likeCount: 34,
    liked: false,
    replies: [
      {
        id: 'r1',
        commentId: 'c1',
        authorId: 'u1',
        body: 'Exactly. A short decision log next to each component has saved us more time than any tooling.',
        createdAt: '2025-05-18T15:02:00Z',
      },
    ],
  },
  {
    id: 'c2',
    postId: 'p1',
    authorId: 'u4',
    body: 'How do you handle adoption when a team insists their use case is "special"? That is where we keep losing the thread.',
    createdAt: '2025-05-19T09:11:00Z',
    likeCount: 12,
    liked: true,
    replies: [],
  },
  {
    id: 'c3',
    postId: 'p2',
    authorId: 'u3',
    body: 'Sessions, not marathons — I felt this. I get more done in two focused blocks than a full unstructured day.',
    createdAt: '2025-05-12T18:40:00Z',
    likeCount: 21,
    liked: false,
    replies: [],
  },
]

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'like',
    actorId: 'u2',
    postId: 'p1',
    text: 'liked your post',
    createdAt: '2025-05-19T10:30:00Z',
    read: false,
  },
  {
    id: 'n2',
    type: 'comment',
    actorId: 'u4',
    postId: 'p1',
    text: 'commented on your post',
    createdAt: '2025-05-19T09:12:00Z',
    read: false,
  },
  {
    id: 'n3',
    type: 'follow',
    actorId: 'u3',
    text: 'started following you',
    createdAt: '2025-05-18T20:05:00Z',
    read: false,
  },
  {
    id: 'n4',
    type: 'reply',
    actorId: 'u2',
    postId: 'p1',
    text: 'replied to your comment',
    createdAt: '2025-05-18T15:30:00Z',
    read: true,
  },
  {
    id: 'n5',
    type: 'mention',
    actorId: 'u4',
    postId: 'p3',
    text: 'mentioned you in a comment',
    createdAt: '2025-05-17T11:45:00Z',
    read: true,
  },
]

export function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getCommentsForPost(postId: string): Comment[] {
  return comments.filter((c) => c.postId === postId)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(iso)
}
