import type { Startup } from "../components/StartupCard";

export const mockStartups: Startup[] = [
  {
    id: 1,
    name: 'StyleThread',
    founder: 'Sarah Johnson',
    description: 'Sustainable fashion for the modern generation. We create eco-friendly clothing that makes a statement.',
    image: 'https://images.unsplash.com/photo-1564518160120-94178fcdf5d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwY2xvdGhpbmclMjBzdGFydHVwfGVufDF8fHx8MTc3MzQ0MDg2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    likes: 234,
    comments: 45,
    verified: true
  },
  {
    id: 2,
    name: 'TechLaunch Hub',
    founder: 'Michael Chen',
    description: 'Building the next generation of productivity tools for remote teams. Making work collaboration seamless.',
    image: 'https://images.unsplash.com/photo-1702047048032-e734daa2473d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHdvcmtzcGFjZSUyMGxhcHRvcHxlbnwxfHx8fDE3NzM0NDA4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tech',
    likes: 567,
    comments: 89,
    verified: true
  },
  {
    id: 3,
    name: 'Fresh Bowl Co.',
    founder: 'Emma Williams',
    description: 'Healthy smoothie bowls delivered to your door. Made fresh daily with organic ingredients.',
    image: 'https://images.unsplash.com/photo-1569089572172-ab475d1a8bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYnVzaW5lc3MlMjBoZWFsdGh5JTIwc21vb3RoaWV8ZW58MXx8fHwxNzczNDQwODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Food',
    likes: 389,
    comments: 62,
    verified: true
  },
  {
    id: 4,
    name: 'Glow Natural',
    founder: 'Olivia Martinez',
    description: 'Handcrafted natural beauty products. Cruelty-free and made with love for your skin.',
    image: 'https://images.unsplash.com/photo-1630331811881-58a6f87bf7f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NzM0NDA4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Beauty',
    likes: 445,
    comments: 78,
    verified: true
  },
  {
    id: 5,
    name: 'Urban Harvest',
    founder: 'David Thompson',
    description: 'Farm-to-table produce delivery service. Supporting local farmers and bringing fresh food to urban communities.',
    image: 'https://images.unsplash.com/photo-1708796705570-33fd29ef67d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm0lMjBmcmVzaCUyMHByb2R1Y2V8ZW58MXx8fHwxNzczNDQwODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Agriculture',
    likes: 312,
    comments: 54,
    verified: true
  },
  {
    id: 6,
    name: 'Canvas Dreams',
    founder: 'Isabella Garcia',
    description: 'Custom artwork and design services for modern spaces. Bringing your creative visions to life.',
    image: 'https://images.unsplash.com/photo-1759150467548-5a97257e583a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBkZXNpZ24lMjBjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzM0NDA4NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Art',
    likes: 523,
    comments: 91,
    verified: true
  },
  {
    id: 7,
    name: 'Craft & Co',
    founder: 'Sophia Lee',
    description: 'Handmade jewelry and accessories. Each piece tells a unique story and is crafted with care.',
    image: 'https://images.unsplash.com/photo-1767476106226-ff48f2e12286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMGFydGlzYW58ZW58MXx8fHwxNzczMzUyNzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Art',
    likes: 278,
    comments: 43,
    verified: true
  },
  {
    id: 8,
    name: 'ProConsult',
    founder: 'James Anderson',
    description: 'Business consulting services for startups. Helping young entrepreneurs turn ideas into successful businesses.',
    image: 'https://images.unsplash.com/photo-1769636929132-e4e7b50cfac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGVudHJlcHJlbmV1ciUyMGJ1c2luZXNzJTIwb3duZXJ8ZW58MXx8fHwxNzczNDQwODY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Services',
    likes: 401,
    comments: 67,
    verified: true
  }
];

export const mockComments = [
  {
    id: 1,
    author: 'Alex Rivera',
    text: 'This is amazing! Love the concept and execution. 🚀',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    author: 'Maya Patel',
    text: 'Great work! How can I order?',
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    author: 'Jordan Kim',
    text: 'Impressive! Wishing you all the success!',
    timestamp: '1 day ago'
  }
];
