'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, User, Bot, Loader2, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { financialAssistantQuery } from '@/ai/fows/financial-assistant-query';

export function AIAssistant() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const result = await financialAssistantQuery({ query: userMsg });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: result.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I encountered an error while analyzing your data. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='h-[600px] flex flex-col border-none shadow-2xl overflow-hidden glass-morphism rounded-3xl'>
      <CardHeader className='bg-primary/5 pb-4 border-b border-border/50'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-lg font-bold'>
            <div className='p-2 bg-primary rounded-lg'>
              <Sparkles className='h-4 w-4 text-primary-foreground' />
            </div>
            Smart Insights
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 rounded-full'
                >
                  <Info className='h-4 w-4 text-muted-foreground' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-xs'>Ask anything about your spending</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className='flex-1 p-0 overflow-hidden bg-gradient-to-b from-primary/5 to-transparent'>
        <ScrollArea className='h-full p-6'>
          <div className='space-y-6'>
            {messages.length === 0 && (
              <div className='text-center py-12 space-y-4'>
                <div className='h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                  <Bot className='h-8 w-8 text-primary opacity-50' />
                </div>
                <div className='space-y-1'>
                  <p className='font-bold text-sm'>
                    Hello! I'm your Finance AI.
                  </p>
                  <p className='text-xs text-muted-foreground px-8'>
                    Ask me about your top expenses, monthly trends, or budget
                    status.
                  </p>
                </div>
                <div className='flex flex-wrap justify-center gap-2 pt-4'>
                  {['Top expenses?', 'Food budget?', 'Monthly trend?'].map(
                    (hint) => (
                      <Button
                        key={hint}
                        variant='outline'
                        size='sm'
                        className='text-[10px] h-7 rounded-full bg-background/50'
                        onClick={() => {
                          setQuery(hint);
                        }}
                      >
                        {hint}
                      </Button>
                    )
                  )}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className='h-8 w-8 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm shadow-primary/20'>
                    <Bot className='h-4 w-4 text-primary-foreground' />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-secondary text-secondary-foreground rounded-tr-none'
                      : 'bg-card border border-border/50 rounded-tl-none text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className='h-8 w-8 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-sm shadow-secondary/20'>
                    <User className='h-4 w-4 text-secondary-foreground' />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className='flex gap-3'>
                <div className='h-8 w-8 rounded-xl bg-primary flex items-center justify-center animate-pulse'>
                  <Bot className='h-4 w-4 text-primary-foreground' />
                </div>
                <div className='bg-card border border-border/50 p-4 rounded-2xl rounded-tl-none flex items-center shadow-sm'>
                  <Loader2 className='h-4 w-4 animate-spin mr-2 text-primary' />
                  <span className='text-xs font-medium'>
                    Analyzing your finances...
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className='p-6 pt-2 bg-card border-t border-border/50'>
        <form onSubmit={handleAsk} className='flex w-full items-center gap-3'>
          <Input
            placeholder='Type a message...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='flex-1 rounded-xl bg-muted/50 border-none focus-visible:ring-primary/30'
          />
          <Button
            type='submit'
            size='icon'
            disabled={isLoading || !query.trim()}
            className='rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'
          >
            <Send className='h-4 w-4' />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
