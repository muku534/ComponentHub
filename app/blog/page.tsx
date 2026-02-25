import { MotionDiv, MotionA } from '@/components/ui/ClientMotion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import NewsletterSignup from '@/components/blog/NewsletterSignup';

interface BlogPost {
    title: string;
    description: string;
    date: string;
    readTime: string;
    link: string;
    tags: string[];
}

const blogs: BlogPost[] = [
    {
        title: 'Implement Push Notifications in React Native with Firebase FCM (HTTP v1)',
        description: 'A comprehensive guide to setting up push notifications using the new Firebase HTTP v1 API and Node.js backend.',
        date: 'Feb 15, 2026',
        readTime: '8 min read',
        link: 'https://medium.com/@prajapatimukesh0111/implement-push-notifications-in-react-native-with-firebase-fcm-http-v1-and-node-js-6d76922f5585',
        tags: ['React Native', 'Firebase', 'Node.js']
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background relative">
            <div className="absolute inset-0 z-0 bg-dot-pattern opacity-[0.4] dark:opacity-[0.2]" />

            <div className="max-w-4xl mx-auto relative z-10">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 pt-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        Blog
                    </h1>
                    <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                        Tutorials, updates, and deep dives into React Native development and UI engineering.
                    </p>
                </MotionDiv>

                <div className="grid gap-6 mb-24">
                    {blogs.map((blog, index) => (
                        <MotionA
                            key={index}
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group block p-8 rounded-[24px] bg-card border border-border/40 hover:border-border/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            {blog.date}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-border" />
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            {blog.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-blue-500 transition-colors">
                                        {blog.title}
                                    </h2>

                                    <p className="text-muted-foreground mb-6 leading-relaxed font-light text-sm md:text-base">
                                        {blog.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border/50 text-xs font-medium tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="shrink-0 self-center hidden md:flex">
                                    <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                                        <ArrowRight className="w-4 h-4 -rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </MotionA>
                    ))}
                </div>

                <NewsletterSignup />
            </div>
        </div>
    );
}
