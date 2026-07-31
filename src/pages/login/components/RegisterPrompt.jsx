import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPrompt = () => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm md:text-base text-muted-foreground font-caption">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-primary hover:text-primary/80 font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded px-1"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default RegisterPrompt;