import React from 'react';
import { ViewId } from '../../types';
import { TechIsland3D } from '../TechIsland3D';

interface HomeViewProps {
  onNavigate: (view: ViewId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="view-container">
      <div className="home-view-full">
        <TechIsland3D onNavigate={onNavigate} />
      </div>
    </div>
  );
};
