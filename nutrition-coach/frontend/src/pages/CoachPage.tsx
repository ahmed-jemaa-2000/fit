import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiApi } from '../lib/api';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function CoachPage() {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');

  const { data: chatHistory } = useQuery({
    queryKey: ['chat', 'history'],
    queryFn: () => aiApi.getChatHistory(),
  });

  const chatMutation = useMutation({
    mutationFn: aiApi.chat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'history'] });
      setMessage('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      chatMutation.mutate(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">AI Coach</h1>
        <p className="text-gray-600">Get personalized nutrition advice</p>
      </div>

      <Card className="h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {chatHistory?.data && chatHistory.data.length > 0 ? (
            chatHistory.data.map((msg: any) => (
              <div key={msg.id} className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-lg p-3 ${msg.role === 'USER' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-20">
              <p>Start a conversation with your AI coach!</p>
              <p className="text-sm mt-2">Ask about nutrition, meal ideas, or your progress</p>
            </div>
          )}
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-900 rounded-lg p-3">
                <p>AI is thinking...</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your coach anything..."
          className="flex-1"
        />
        <Button type="submit" variant="primary" isLoading={chatMutation.isPending}>
          Send
        </Button>
      </form>
    </div>
  );
}
