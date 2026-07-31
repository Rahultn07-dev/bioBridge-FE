import React, { useState } from 'react';
import InstitutionSidebar from '../../components/ui/InstitutionSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InstitutionSettings = () => {
  const [form, setForm] = useState({
    name: 'Allen Career Institute',
    code: 'ALLEN_KOTA_01',
    email: 'admin@allendigital.in',
    phone: '+91 744-2757575',
    city: 'Kota',
    state: 'Rajasthan',
    primaryColor: '#10B981',
    logo: '',
    aiKnowledge: false,
    customDomain: '',
    plan: 'BASIC',
    maxStudents: 500,
    maxBatches: 10,
  });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Institution Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage your institution profile and plan</p>
              </div>
              <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} iconName={saved ? 'CheckCircle' : 'Save'} iconPosition="left">
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>

            {/* Plan banner */}
            <div className="bg-gradient-to-br from-violet-500/10 to-primary/5 border border-violet-500/20 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Star" size={16} className="text-amber-400" />
                    <span className="font-heading font-bold text-foreground">BASIC Plan</span>
                  </div>
                  <div className="text-sm text-muted-foreground">500 students · 10 batches · 20 GB storage</div>
                  <div className="text-xs text-muted-foreground mt-1">No AI Knowledge Base · No custom domain</div>
                </div>
                <Button variant="outline" size="sm">Upgrade to PRO</Button>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[{ label: 'Students', used: 247, max: 500 }, { label: 'Batches', used: 6, max: 10 }, { label: 'Storage (GB)', used: 4.2, max: 20 }].map(u => (
                  <div key={u.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{u.label}</span>
                      <span className="text-foreground">{u.used}/{u.max}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(u.used / u.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Institution profile */}
            <div className="bg-card border border-border rounded-xl p-5 mb-5">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Building2" size={15} className="text-primary" />
                Institution Profile
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { k: 'name', label: 'Institution Name', placeholder: 'Allen Career Institute' },
                  { k: 'code', label: 'Institution Code (read-only)', placeholder: 'ALLEN_KOTA_01', readonly: true },
                  { k: 'email', label: 'Admin Email', placeholder: 'admin@institution.com' },
                  { k: 'phone', label: 'Phone', placeholder: '+91 99999 00000' },
                  { k: 'city', label: 'City', placeholder: 'Kota' },
                  { k: 'state', label: 'State', placeholder: 'Rajasthan' },
                ].map(f => (
                  <div key={f.k}>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">{f.label}</label>
                    <input
                      value={form[f.k]}
                      onChange={e => !f.readonly && set(f.k, e.target.value)}
                      placeholder={f.placeholder}
                      readOnly={f.readonly}
                      className={`w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${f.readonly ? 'opacity-60 cursor-not-allowed' : ''}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Branding (PRO) */}
            <div className="bg-card border border-border rounded-xl p-5 mb-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                <div className="text-center">
                  <Icon name="Lock" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">PRO Feature</div>
                  <div className="text-xs text-muted-foreground">Upgrade to unlock white-labeling</div>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Palette" size={15} className="text-primary" />
                Branding (PRO)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Primary Colour</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={form.primaryColor} onChange={e => set('primaryColor', e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer" />
                    <span className="text-sm text-foreground font-mono">{form.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Custom Domain</label>
                  <input value={form.customDomain} placeholder="practice.yourinstitute.in" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none" disabled />
                </div>
              </div>
            </div>

            {/* AI Knowledge (PRO) */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                    <Icon name="Brain" size={15} className="text-violet-400" />
                    AI Knowledge Base (PRO)
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Enable PDF/video uploads that power your students' AI doubt solver</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground">Requires PRO</span>
                  <div className="w-11 h-6 bg-secondary border border-border rounded-full opacity-50 cursor-not-allowed relative">
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-muted-foreground/30 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionSettings;
