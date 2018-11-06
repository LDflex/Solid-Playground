import React from 'react';
import { LoggedIn, LoggedOut, AuthButton, Value } from '@solid/react';
import './Header.css';

export default function Header() {
  return (
    <header>
      <h1>Solid LDflex playground</h1>
      <p>
        <LoggedOut>You are not logged in.</LoggedOut>
        <LoggedIn>Welcome, <Value src="user.name"/>!</LoggedIn>
        <AuthButton popup="https://solid.community/.well-known/solid/login"/>
      </p>
    </header>
  );
}
