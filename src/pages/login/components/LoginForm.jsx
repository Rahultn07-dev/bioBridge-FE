import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    email: 'student@neetjee.com',
    password: 'Prep@2025'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e.target.checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Debug logging
    console.log('Form submitted with:', formData);
    console.log('Expected credentials:', mockCredentials);
    console.log('Email match:', formData.email === mockCredentials.email);
    console.log('Password match:', formData.password === mockCredentials.password);

    setTimeout(() => {
      const emailMatch = formData.email.trim() === mockCredentials.email;
      const passwordMatch = formData.password.trim() === mockCredentials.password;

      if (emailMatch && passwordMatch) {
        console.log('Login successful!');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/activity-dashboard');
      } else {
        console.log('Login failed - incorrect credentials');
        setErrors({
          submit: `Invalid credentials. Please use:\nEmail: ${mockCredentials.email}\nPassword: ${mockCredentials.password}`
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded p-1"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          disabled={isLoading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleCheckboxChange}
          disabled={isLoading}
        />
        <a
          href="#"
          className="text-sm font-caption text-primary hover:text-primary/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded px-1"
        >
          Forgot password?
        </a>
      </div>
      {errors.submit && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={20} color="var(--color-destructive)" className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive whitespace-pre-line">{errors.submit}</p>
          </div>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;