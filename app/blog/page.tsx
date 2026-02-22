
import { MotionDiv, MotionA } from '@/components/ui/ClientMotion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
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
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Blog
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Tutorials, updates, and insights about React Native development.
                    </p>
                </MotionDiv>

                {/* Blog Grid */}
                <div className="grid gap-6 mb-20">
                    {blogs.map((blog, index) => (
                        <MotionA
                            key={index}
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group block p-6 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                        <span>{blog.date}</span>
                                        <span>•</span>
                                        <span>{blog.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                                        {blog.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {blog.description}
                                    </p>
                                    <div className="flex gap-2">
                                        {blog.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="shrink-0 self-center">
                                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </MotionA>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <NewsletterSignup />
            </div>
        </div>
    );
}
