import React from 'react';

interface CustomerAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bgColor?: string;
}

export const CustomerAvatar: React.FC<CustomerAvatarProps> = ({
  name,
  size = 'md',
  bgColor = 'bg-blue-600',
}) => {
  const getInitials = (fullName: string) => {
    if (!fullName) return 'CU';
    const parts = fullName.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs font-semibold',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-12 h-12 text-base font-bold',
    xl: 'w-16 h-16 text-xl font-bold',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white shadow-sm ring-2 ring-white/10 shrink-0 select-none`}
    >
      {getInitials(name)}
    </div>
  );
};
