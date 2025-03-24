"use client";

export default function MyComponent() {
  const handleLogin = () => {
    console.log('Button clicked');
  };

  return <button onClick={handleLogin}>Click Me</button>;
}
