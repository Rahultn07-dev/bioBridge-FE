import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    studyReminders: true,
    darkMode: true,
    soundEffects: false,
    publicProfile: false,
    showRanking: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev?.[key] }));
  };

  const settingSections = [
    {
      title: 'Notifications',
      icon: 'Bell',
      settings: [
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
        { key: 'weeklyReport', label: 'Weekly Progress Report', description: 'Get weekly performance summary' },
        { key: 'studyReminders', label: 'Study Reminders', description: 'Daily practice reminders' }
      ]
    },
    {
      title: 'Appearance',
      icon: 'Palette',
      settings: [
        { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme' },
        { key: 'soundEffects', label: 'Sound Effects', description: 'Enable UI sound effects' }
      ]
    },
    {
      title: 'Privacy',
      icon: 'Shield',
      settings: [
        { key: 'publicProfile', label: 'Public Profile', description: 'Make profile visible to others' },
        { key: 'showRanking', label: 'Show Ranking', description: 'Display your rank publicly' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {settingSections?.map((section) => (
        <div key={section?.title} className="bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={section?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
                {section?.title}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {section?.settings?.map((setting) => (
              <div
                key={setting?.key}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-smooth"
              >
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-caption font-medium text-foreground mb-1">
                    {setting?.label}
                  </h3>
                  <p className="text-xs text-muted-foreground font-caption">
                    {setting?.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting(setting?.key)}
                  className={`relative w-12 h-6 rounded-full transition-smooth ${
                    settings?.[setting?.key] ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-smooth ${
                      settings?.[setting?.key] ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-error/10 flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Account Management
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Key" size={16} />
            <span className="ml-2">Change Password</span>
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Download" size={16} />
            <span className="ml-2">Export Data</span>
          </Button>
          <Button variant="danger" className="w-full justify-start">
            <Icon name="Trash2" size={16} />
            <span className="ml-2">Delete Account</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;