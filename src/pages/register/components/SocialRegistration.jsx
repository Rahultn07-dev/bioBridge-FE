import React from 'react';
import Button from '../../../components/ui/Button';


const SocialRegistration = () => {
  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs md:text-sm">
          <span className="bg-card px-3 md:px-4 text-muted-foreground font-caption">
            Or register with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('Google')}
          iconName="Chrome"
          iconPosition="left"
          className="w-full"
        >
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('Microsoft')}
          iconName="Box"
          iconPosition="left"
          className="w-full"
        >
          Microsoft
        </Button>
      </div>
    </div>
  );
};

export default SocialRegistration;