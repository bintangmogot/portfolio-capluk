'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export default function ProjectShowcase({ projects, onProjectClick }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.12),
        y: lerp(prev.y, mousePosition.y, 0.12),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full">
      {/* Floating preview image — follows cursor */}
      <div
        className={`project-preview-float ${isVisible ? 'project-preview-float--visible' : 'project-preview-float--hidden'}`}
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 110}px, 0)`,
        }}
      >
        {projects.map((project, index) => (
          <img
            key={project.id}
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: hoveredIndex === index ? 1 : 0,
              transform: hoveredIndex === index ? 'scale(1)' : 'scale(1.1)',
              filter: hoveredIndex === index ? 'none' : 'blur(12px)',
              transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ))}
        {/* Liquid glass overlay on preview */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.3) 100%)',
            borderRadius: 'inherit',
          }}
        />
      </div>

      {/* Project list */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-list__item cursor-hover"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onProjectClick?.(project)}
            role="button"
            tabIndex={0}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="project-list__title">
                  <span className="project-list__title-line">{project.title}</span>
                </h3>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-muted"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? 'translate(0, 0)' : 'translate(-8px, 8px)',
                    transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
              <p
                className="text-label mt-1"
                style={{
                  color: hoveredIndex === index ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                  transition: 'color 300ms ease',
                }}
              >
                {project.category}
              </p>
            </div>
            <span className="project-list__meta">{project.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
