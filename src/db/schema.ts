import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Quiz responses table
export const quizResponses = sqliteTable('quiz_responses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  questionId: text('question_id').notNull(),
  answerIndex: integer('answer_index').notNull(),
  category: text('category').notNull(),
  createdAt: text('created_at').notNull(),
});

// Quiz results table
export const quizResults = sqliteTable('quiz_results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  balanceScore: integer('balance_score').notNull(),
  moodResult: text('mood_result').notNull(),
  cognitiveScore: integer('cognitive_score').notNull(),
  physicalScore: integer('physical_score').notNull(),
  digitalScore: integer('digital_score').notNull(),
  createdAt: text('created_at').notNull(),
});

// Wellness goals table
export const wellnessGoals = sqliteTable('wellness_goals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  goalId: text('goal_id').notNull(),
  goalTitle: text('goal_title').notNull(),
  selectedAt: text('selected_at').notNull(),
});

// Wellness plans table
export const wellnessPlans = sqliteTable('wellness_plans', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  planData: text('plan_data', { mode: 'json' }).notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// User metrics table
export const userMetrics = sqliteTable('user_metrics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  metricType: text('metric_type').notNull(),
  value: text('value').notNull(),
  date: text('date').notNull(),
  createdAt: text('created_at').notNull(),
});

// Badges table
export const badges = sqliteTable('badges', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  badgeId: text('badge_id').notNull(),
  badgeName: text('badge_name').notNull(),
  earnedAt: text('earned_at').notNull(),
});

// User streaks table
export const userStreaks = sqliteTable('user_streaks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  currentStreak: integer('current_streak').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  lastActivityDate: text('last_activity_date'),
  updatedAt: text('updated_at').notNull(),
});

// Daily tasks table
export const dailyTasks = sqliteTable('daily_tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  taskName: text('task_name').notNull(),
  taskTime: text('task_time').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  completionDate: text('completion_date'),
});

// Family members table
export const familyMembers = sqliteTable('family_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  familyGroupId: text('family_group_id').notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
  joinedAt: text('joined_at').notNull(),
});

// Community posts table
export const communityPosts = sqliteTable('community_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  authorId: integer('author_id').references(() => users.id),
  authorName: text('author_name').notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(),
  isAnonymous: integer('is_anonymous', { mode: 'boolean' }).notNull().default(false),
  likesCount: integer('likes_count').notNull().default(0),
  commentsCount: integer('comments_count').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Post likes table
export const postLikes = sqliteTable('post_likes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id').notNull().references(() => communityPosts.id),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: text('created_at').notNull(),
});

// Post comments table
export const postComments = sqliteTable('post_comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id').notNull().references(() => communityPosts.id),
  userId: integer('user_id').notNull().references(() => users.id),
  commentText: text('comment_text').notNull(),
  createdAt: text('created_at').notNull(),
});

// User settings table
export const userSettings = sqliteTable('user_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  theme: text('theme').notNull().default('light'),
  notificationsEnabled: integer('notifications_enabled', { mode: 'boolean' }).notNull().default(true),
  smsEnabled: integer('sms_enabled', { mode: 'boolean' }).notNull().default(false),
  emailEnabled: integer('email_enabled', { mode: 'boolean' }).notNull().default(true),
  updatedAt: text('updated_at').notNull(),
});