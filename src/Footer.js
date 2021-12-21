import React from 'react';
import { Label, Link, Like } from '@solid/react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <p>
        <Like object="https://ldflex.github.io/Solid-Playground/">the LDflex playground</Like>
      </p>
      <p>
        Created by 
        <Link href="[https://ruben.verborgh.org/profile/#me].homepage" target="_blank">
          <Label src="[https://ruben.verborgh.org/profile/#me]"/>
        </Link>.
        Source code on 
        <a href="https://github.com/LDflex/Solid-Playground/">GitHub</a>.
      </p>
    </footer>
  );
}
