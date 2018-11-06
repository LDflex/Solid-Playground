import React from 'react';
import { Label, Link } from '@solid/react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <p>
        by 
        <Link href="[https://ruben.verborgh.org/profile/#me].homepage" target="_blank">
          <Label src="[https://ruben.verborgh.org/profile/#me]"/>
        </Link>.
        Source code on 
        <a href="https://github.com/solid/ldflex-playground">GitHub</a>.
      </p>
    </footer>
  );
}
