import React, { useState, useRef, useEffect } from 'react';

// Simple in-file placeholder service
function getSampleConversations() {
  return [
    { id: 'c1', title: 'Career goals & roadmap', lastMessage: 'Focus on system design and distributed systems projects.' },
    { id: 'c2', title: 'Resume review', lastMessage: 'Your experience section could highlight impact metrics.' },
  ];
}

function getSuggestedPrompts() {
  return [
    'Review my skills',
    'Find internships',
    'What should I learn next?',
    'Prepare me for Google',
    'Recommend projects',
    'Review my resume',
    'Compare backend vs AI career',
  ];
}

function getInitialMessages() {
  return [
    { id: 'm1', role: 'assistant', text: 'Hi! I can help with career advice, resume feedback, and learning plans. Try one of the suggested prompts.' },
    { id: 'm2', role: 'user', text: "I'm interested in backend roles and systems design." },
    { id: 'm3', role: 'assistant', text: 'Great — to grow into platform roles, focus on distributed systems, databases, and scalability. Want a 3-month learning plan?' },
  ];
}

function ChatBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}> 
      <div className={`${isUser ? 'bg-indigo-600 text-white' : 'bg-white text-slate-900 border'} max-w-[80%] p-3 rounded-xl shadow-sm`}>
        <div className="text-sm whitespace-pre-wrap">{message.text}</div>
      </div>
    </div>
  );
}

function ChatList({ conversations = [], activeId, onSelect }) {
  return (
    <aside className="w-64 border-r border-gray-100 bg-white rounded-lg p-3 h-[70vh] overflow-auto">
      <div className="text-xs text-gray-500 mb-3">Conversations</div>
      <div className="space-y-2">
        {conversations.map((c) => (
          <button key={c.id} onClick={() => onSelect(c)} className={`w-full text-left p-2 rounded-md ${activeId === c.id ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
            <div className="text-sm font-medium text-slate-900">{c.title}</div>
            <div className="text-xs text-gray-500 mt-1 truncate">{c.lastMessage}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}

function SuggestedPrompts({ prompts = [], onPick }) {
  return (
    <div className="mt-4">
      <div className="text-xs text-gray-500 mb-2">Suggested prompts</div>
      <div className="flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button key={p} onClick={() => onPick(p)} className="text-sm px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200">{p}</button>
        ))}
      </div>
    </div>
  );
}

function ChatInput({ onSend }) {
  const [value, setValue] = useState('');
  const ref = useRef();

  useEffect(() => { ref.current?.focus(); }, []);

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <input ref={ref} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} placeholder="Ask career questions, request recommendations, or upload resume for review (coming soon)..." className="flex-1 border rounded-lg px-3 py-2" />
        <button onClick={submit} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Send</button>
      </div>
    </div>
  );
}

function ChatWindow({ messages, onSend, prompts, onPickPrompt }) {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-[70vh] bg-white rounded-lg p-4 shadow-sm">
      <div ref={containerRef} className="overflow-auto flex-1 pr-2">
        {messages.map((m) => <ChatBubble key={m.id} message={m} />)}
      </div>

      <SuggestedPrompts prompts={prompts} onPick={onPickPrompt} />
      <ChatInput onSend={onSend} />
    </div>
  );
}

export default function ChatPage() {
  const [conversations] = useState(getSampleConversations());
  const [activeConv, setActiveConv] = useState(conversations[0]?.id ?? null);
  const [messages, setMessages] = useState(getInitialMessages());
  const prompts = getSuggestedPrompts();

  const handleSelect = (conv) => {
    setActiveConv(conv.id);
    // Placeholder: in future load conversation messages
    setMessages(getInitialMessages());
  };

  const handleSend = (text) => {
    const userMsg = { id: `u-${Date.now()}`, role: 'user', text };
    setMessages((m) => [...m, userMsg]);

    // Simulate assistant reply
    setTimeout(() => {
      const reply = { id: `a-${Date.now()}`, role: 'assistant', text: `Simulated AI reply to: "${text}"` };
      setMessages((m) => [...m, reply]);
    }, 700);
  };

  const handlePickPrompt = (p) => { handleSend(p); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <ChatList conversations={conversations} activeId={activeConv} onSelect={handleSelect} />
      </div>

      <div className="lg:col-span-1">
        <ChatWindow messages={messages} onSend={handleSend} prompts={prompts} onPickPrompt={handlePickPrompt} />
      </div>

      <aside className="lg:col-span-1">
        <div className="rounded-lg bg-white p-4 shadow-sm border">
          <h4 className="text-sm font-semibold">Context</h4>
          <p className="text-xs text-gray-500 mt-2">Contextual suggestions and profile summary to the right will help the AI personalize responses.</p>

          <div className="mt-4 text-sm">
            <div className="font-medium">Profile snapshot</div>
            <div className="text-xs text-gray-600 mt-1">Priyanka — Aspiring Backend SDE • Bengaluru</div>
            <div className="text-xs text-gray-600 mt-2">Skills: Python, Node.js, PostgreSQL</div>
            <div className="text-xs text-gray-600 mt-2">Experience: Backend Intern (6 months)</div>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-medium">Quick actions</h5>
            <div className="mt-2 flex flex-col gap-2">
              <button className="text-sm px-3 py-2 bg-slate-100 rounded-md">Ask for a 3-month plan</button>
              <button className="text-sm px-3 py-2 bg-slate-100 rounded-md">Analyze my resume (coming soon)</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}