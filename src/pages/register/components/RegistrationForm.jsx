import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    targetExam: '',
    examYear: '',
    academicYear: '',
    preferredSubjects: [],
    agreeTerms: false,
    agreePrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const examOptions = [
    { value: 'neet', label: 'NEET (Medical)' },
    { value: 'jee-main', label: 'JEE Main (Engineering)' },
    { value: 'jee-advanced', label: 'JEE Advanced (IIT)' },
    { value: 'both', label: 'Both NEET & JEE' }
  ];

  const examYearOptions = [
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' }
  ];

  const academicYearOptions = [
    { value: '11th', label: 'Class 11th' },
    { value: '12th', label: 'Class 12th' },
    { value: 'dropper', label: 'Dropper/Gap Year' }
  ];

  const subjectOptions = [
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'mathematics', label: 'Mathematics' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (password?.length >= 12) strength += 25;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) strength += 25;
    if (/\d/?.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/?.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      let strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 50) {
      newErrors.password = 'Password is too weak. Add uppercase, numbers, and special characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.targetExam) {
      newErrors.targetExam = 'Please select your target exam';
    }

    if (!formData?.examYear) {
      newErrors.examYear = 'Please select expected exam year';
    }

    if (!formData?.academicYear) {
      newErrors.academicYear = 'Please select your current academic year';
    }

    if (formData?.preferredSubjects?.length === 0) {
      newErrors.preferredSubjects = 'Please select at least one subject';
    }

    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    if (!formData?.agreePrivacy) {
      newErrors.agreePrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/activity-dashboard');
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-destructive';
    if (passwordStrength < 60) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Medium';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={(e) => handleInputChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        description="We'll use this for login and important updates"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
      />
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring rounded p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {formData?.password && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground font-caption">Password Strength:</span>
              <span className={`font-medium ${
                passwordStrength < 30 ? 'text-destructive' : 
                passwordStrength < 60 ? 'text-warning': 'text-success'
              }`}>
                {getPasswordStrengthLabel()}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring rounded p-1"
          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>
      <Select
        label="Target Exam"
        placeholder="Select your target exam"
        options={examOptions}
        value={formData?.targetExam}
        onChange={(value) => handleInputChange('targetExam', value)}
        error={errors?.targetExam}
        required
      />
      <Select
        label="Expected Exam Year"
        placeholder="When do you plan to take the exam?"
        options={examYearOptions}
        value={formData?.examYear}
        onChange={(value) => handleInputChange('examYear', value)}
        error={errors?.examYear}
        required
      />
      <Select
        label="Current Academic Year"
        placeholder="Select your current class/status"
        options={academicYearOptions}
        value={formData?.academicYear}
        onChange={(value) => handleInputChange('academicYear', value)}
        error={errors?.academicYear}
        required
      />
      <Select
        label="Preferred Subjects"
        description="Select subjects you want to focus on"
        placeholder="Choose one or more subjects"
        options={subjectOptions}
        value={formData?.preferredSubjects}
        onChange={(value) => handleInputChange('preferredSubjects', value)}
        error={errors?.preferredSubjects}
        multiple
        searchable
        required
      />
      <div className="space-y-3 pt-2">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData?.agreeTerms}
          onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
          error={errors?.agreeTerms}
          required
        />

        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData?.agreePrivacy}
          onChange={(e) => handleInputChange('agreePrivacy', e?.target?.checked)}
          error={errors?.agreePrivacy}
          required
        />
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isSubmitting}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-6"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;