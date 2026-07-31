import React, { useState } from 'react';

import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DoubtSubmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    question: '',
    subject: '',
    concept: '',
    priority: 'normal',
    image: null,
    resolutionMethod: 'ai'
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const subjectOptions = [
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'mathematics', label: 'Mathematics' }
  ];

  const conceptOptions = {
    physics: [
      { value: 'mechanics', label: 'Mechanics' },
      { value: 'thermodynamics', label: 'Thermodynamics' },
      { value: 'electromagnetism', label: 'Electromagnetism' },
      { value: 'optics', label: 'Optics' }
    ],
    chemistry: [
      { value: 'organic', label: 'Organic Chemistry' },
      { value: 'inorganic', label: 'Inorganic Chemistry' },
      { value: 'physical', label: 'Physical Chemistry' }
    ],
    biology: [
      { value: 'genetics', label: 'Genetics' },
      { value: 'ecology', label: 'Ecology' },
      { value: 'human-physiology', label: 'Human Physiology' }
    ],
    mathematics: [
      { value: 'calculus', label: 'Calculus' },
      { value: 'algebra', label: 'Algebra' },
      { value: 'trigonometry', label: 'Trigonometry' }
    ]
  };

  const priorityOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const resolutionMethodOptions = [
    { value: 'ai', label: 'AI Assistant (Instant)' },
    { value: 'teacher', label: 'Escalate to Teacher (24 hours)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader?.result);
      };
      reader?.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.question?.trim()) {
      newErrors.question = 'Please enter your question';
    } else if (formData?.question?.trim()?.length < 10) {
      newErrors.question = 'Question must be at least 10 characters';
    }
    if (!formData?.subject) {
      newErrors.subject = 'Please select a subject';
    }
    if (!formData?.concept) {
      newErrors.concept = 'Please select a concept';
    }
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        question: '',
        subject: '',
        concept: '',
        priority: 'normal',
        image: null
      });
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="MessageCircleQuestion" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
            Submit Your Doubt
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Get expert clarification on challenging concepts
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-5 lg:space-y-6">
        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            Your Question <span className="text-destructive">*</span>
          </label>
          <textarea
            value={formData?.question}
            onChange={(e) => handleInputChange('question', e?.target?.value)}
            placeholder="Describe your doubt in detail. Include what you've tried and where you're stuck..."
            rows={5}
            className={`w-full px-4 py-3 bg-background border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none ${
              errors?.question ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors?.question && (
            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
              <Icon name="AlertCircle" size={12} />
              {errors?.question}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          <Select
            label="Subject"
            required
            options={subjectOptions}
            value={formData?.subject}
            onChange={(value) => {
              handleInputChange('subject', value);
              handleInputChange('concept', '');
            }}
            placeholder="Select subject"
            error={errors?.subject}
          />

          <Select
            label="Concept/Topic"
            required
            options={formData?.subject ? conceptOptions?.[formData?.subject] : []}
            value={formData?.concept}
            onChange={(value) => handleInputChange('concept', value)}
            placeholder="Select concept"
            disabled={!formData?.subject}
            error={errors?.concept}
          />
        </div>

        <Select
          label="Priority Level"
          options={priorityOptions}
          value={formData?.priority}
          onChange={(value) => handleInputChange('priority', value)}
          description="Mark as urgent if you need immediate assistance"
        />

        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            Resolution Method <span className="text-destructive">*</span>
          </label>
          <div className="space-y-3">
            {resolutionMethodOptions?.map((method) => (
              <label
                key={method?.value}
                className={`
                  flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-smooth
                  ${
                    formData?.resolutionMethod === method?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-secondary'
                  }
                `}
              >
                <input
                  type="radio"
                  name="resolutionMethod"
                  value={method?.value}
                  checked={formData?.resolutionMethod === method?.value}
                  onChange={(e) => handleInputChange('resolutionMethod', e?.target?.value)}
                  className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      name={method?.value === 'ai' ? 'Sparkles' : 'UserCheck'}
                      size={16}
                      color={formData?.resolutionMethod === method?.value ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                    />
                    <span className="text-sm font-caption font-medium text-foreground">
                      {method?.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {method?.value === 'ai' ?'Get instant AI-powered explanations and step-by-step solutions' :'Connect with expert teachers for detailed personalized guidance'}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground flex items-start gap-1">
            <Icon name="Info" size={12} className="mt-0.5" />
            <span>
              {formData?.resolutionMethod === 'ai' ?'AI will analyze your question and provide instant clarification. You can escalate to a teacher anytime if needed.' :'Your doubt will be assigned to a subject expert who will respond within 24 hours.'}
            </span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            Attach Image (Optional)
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Upload diagrams, mathematical expressions, or question screenshots (Max 5MB)
          </p>
          
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-smooth bg-background">
              <div className="flex flex-col items-center justify-center gap-2">
                <Icon name="Upload" size={24} color="var(--color-muted-foreground)" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or JPEG (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="relative w-full h-48 md:h-56 lg:h-64 border border-border rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Uploaded doubt image showing mathematical expression or diagram for clarification"
                className="w-full h-full object-contain bg-background"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center hover:bg-destructive/90 transition-smooth"
              >
                <Icon name="X" size={16} color="white" />
              </button>
            </div>
          )}
          {errors?.image && (
            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
              <Icon name="AlertCircle" size={12} />
              {errors?.image}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="submit"
            variant="default"
            iconName="Send"
            iconPosition="right"
            className="flex-1 sm:flex-initial"
          >
            Submit Doubt
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                question: '',
                subject: '',
                concept: '',
                priority: 'normal',
                image: null
              });
              setImagePreview(null);
              setErrors({});
            }}
          >
            Clear Form
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DoubtSubmissionForm;