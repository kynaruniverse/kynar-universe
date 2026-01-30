'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Section from '@/components/layout/Section';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/account/callback`,
      },
    });

    if (error) {
      setMessage("Calibration failed. Please check your email address.");
    } else {
      setMessage("A magic link has been sent to your universe.");
    }
    setLoading(false);
  };

  return (
    <Section className="min-h-[70vh] flex flex-col justify-center space-y-8 animate-in fade-in duration-1000">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-kyn-green-700 italic">Welcome Back.</h1>
        <p className="text-sm text-kyn-slate-400">Enter your email to restore your session.</p>
      </header>

      <form onSubmit={handleLogin} className="space-y-6">
        <Input 
          label="Email Address"
          type="email"
          placeholder="cosmos@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Button type="submit" isLoading={loading}>
          Send Magic Link
        </Button>
      </form>

      {message && (
        <p className="text-center text-[10px] uppercase tracking-widest font-bold text-kyn-green-700 animate-pulse">
          {message}
        }
      </p>
      )}
    </Section>
  );
}
