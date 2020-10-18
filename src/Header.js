import React from 'react';
import { LoggedIn, LoggedOut, AuthButton, Link, Name } from '@solid/react';
import './Header.css';

export default function Header() {
  return (
    <header>
      <h1>Solid LDflex playground</h1>
      <p>
        <LoggedOut>You are not logged in.</LoggedOut>
        <LoggedIn>Welcome, <Link href="user"><Name src="user"/></Link>!</LoggedIn>
      </p>
      <AuthButton popup="https://solidcommunity.net/.well-known/solid/login"/>
    </header>
  );
}
