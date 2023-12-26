import { redirect } from 'next/navigation';
export default function Home() {
  redirect('/dashboard');
  return <span>Hello world</span>;
}
