'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/trueclickseo@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      {status === 'success' && (
        <div className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex gap-3 text-emerald-500">
          <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold">Message sent successfully!</h3>
            <p className="text-xs font-semibold opacity-85 mt-1">We will review your message and get back to you shortly.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex gap-3 text-red-500">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold">Failed to send message</h3>
            <p className="text-xs font-semibold opacity-85 mt-1">Please ensure all fields are filled out correctly and try again.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="user-name" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">Your Name</label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setStatus('idle'); }}
              placeholder="e.g. Jane Doe"
              required
              disabled={status === 'submitting'}
              className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="user-email" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">Email Address</label>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder="e.g. jane@example.com"
              required
              disabled={status === 'submitting'}
              className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="msg-subject" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">Subject</label>
          <input
            id="msg-subject"
            type="text"
            value={subject}
            onChange={(e) => { setSubject(e.target.value); setStatus('idle'); }}
            placeholder="e.g. Bug report, feedback, custom requests"
            required
            disabled={status === 'submitting'}
            className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="msg-content" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">Message</label>
          <textarea
            id="msg-content"
            rows={5}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setStatus('idle'); }}
            placeholder="Describe your inquiry in detail..."
            required
            disabled={status === 'submitting'}
            className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 disabled:opacity-50 resize-none"
          />
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
