import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);

  const profileData = {
    name: 'Rahul Kumar',
    email: 'student@neetjee.com',
    targetExam: 'NEET 2025',
    expectedYear: '2025',
    academicStatus: '12th Grade',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ece17484-1763301747443.png',
    avatarAlt: 'Profile photo of Rahul Kumar, NEET 2025 aspirant',
    joinedDate: 'January 2024',
    location: 'Mumbai, Maharashtra'
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="h-32 md:h-40 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5" />
      
      <div className="px-4 md:px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-muted border-4 border-background">
                <Image
                  src={profileData?.avatar}
                  alt={profileData?.avatarAlt}
                  className="w-full h-full object-cover" />

              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-smooth">
                <Icon name="Camera" size={16} />
              </button>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {profileData?.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-caption">
                {profileData?.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-caption font-medium bg-primary/10 text-primary">
                  {profileData?.targetExam}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-caption font-medium bg-secondary text-secondary-foreground">
                  {profileData?.academicStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}>

              <Icon name="Edit2" size={16} />
              <span className="ml-2">Edit Profile</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Share2" size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground font-caption mb-1">Member Since</p>
            <p className="text-sm md:text-base font-caption font-medium text-foreground">
              {profileData?.joinedDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-caption mb-1">Location</p>
            <p className="text-sm md:text-base font-caption font-medium text-foreground">
              {profileData?.location}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-caption mb-1">Expected Year</p>
            <p className="text-sm md:text-base font-caption font-medium text-foreground">
              {profileData?.expectedYear}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-caption mb-1">Study Streak</p>
            <p className="text-sm md:text-base font-caption font-medium text-primary">
              127 days 🔥
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default ProfileHeader;