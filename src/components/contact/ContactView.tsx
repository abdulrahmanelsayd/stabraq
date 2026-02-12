'use client'

import { useState } from 'react'
import PageShell from '@/components/layout/PageShell'
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react'

export default function ContactView() {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Frontend-only: simulate submission
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setFormState({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <PageShell>
            {/* Hero */}
            <section className="py-24 md:py-32 bg-luxury-black text-white text-center px-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Get In Touch</span>
                <h1 className="text-5xl md:text-7xl font-display tracking-tight mb-6">Contact Us</h1>
                <p className="text-white/60 max-w-lg mx-auto">
                    Have a question, feedback, or just want to say hello? We&apos;d love to hear from you.
                </p>
            </section>

            <section className="py-24 px-4 md:px-8">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-2xl font-display text-luxury-black mb-8 tracking-tight">Reach Out</h2>
                            <div className="space-y-6">
                                {[
                                    { icon: Phone, label: 'Phone', value: '01123399345', href: 'tel:01123399345' },
                                    { icon: Mail, label: 'Email', value: 'info@stabraq.com', href: 'mailto:info@stabraq.com' },
                                    { icon: MapPin, label: 'Location', value: 'Cairo, Egypt', href: '#' },
                                ].map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-luxury-black/5 flex items-center justify-center shrink-0 group-hover:bg-luxury-black group-hover:text-white transition-colors">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">{item.label}</span>
                                            <span className="text-luxury-black font-medium">{item.value}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                {[
                                    { icon: Instagram, href: 'https://instagram.com/stabraqts' },
                                    { icon: Facebook, href: 'https://facebook.com/StabraqTS' },
                                    { icon: Twitter, href: 'https://twitter.com/StabraqTS' },
                                ].map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-luxury-black/70 hover:text-luxury-black hover:border-luxury-black transition-colors bg-black/5"
                                    >
                                        <s.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Hours */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Working Hours</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>Saturday – Thursday: 10am – 10pm</p>
                                <p>Friday: 2pm – 10pm</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/5">
                            <h2 className="text-2xl font-display text-luxury-black mb-8 tracking-tight">Send a Message</h2>

                            {submitted ? (
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-display text-luxury-black mb-2">Message Sent!</h3>
                                    <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Name</label>
                                            <input
                                                type="text" required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full bg-gray-50 rounded-xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-luxury-black/10 transition-all border border-transparent focus:border-luxury-black/10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email</label>
                                            <input
                                                type="email" required
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                className="w-full bg-gray-50 rounded-xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-luxury-black/10 transition-all border border-transparent focus:border-luxury-black/10"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                                        <input
                                            type="text" required
                                            value={formState.subject}
                                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                            className="w-full bg-gray-50 rounded-xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-luxury-black/10 transition-all border border-transparent focus:border-luxury-black/10"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Message</label>
                                        <textarea
                                            required rows={5}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full bg-gray-50 rounded-xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-luxury-black/10 transition-all resize-none border border-transparent focus:border-luxury-black/10"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-luxury-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    )
}
