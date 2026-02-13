import { useMode } from '@/contexts/ModeContext';
import { buildModePath, LanguageMode } from '@/lib/modes';

/**
 * Hook to generate paths with the current mode prefix
 */
export function useModePath() {
  const { mode } = useMode();

  /**
   * Build a path with the current mode prefix
   * @param path - Path without mode prefix (e.g., 'courses' or '/courses')
   * @returns Full path with mode prefix (e.g., '/hi-mixed/courses')
   */
  const getPath = (path: string = '') => {
    return buildModePath(mode, path);
  };

  /**
   * Build a path with a specific mode prefix
   * @param targetMode - The mode to use
   * @param path - Path without mode prefix
   * @returns Full path with specified mode prefix
   */
  const getPathForMode = (targetMode: LanguageMode, path: string = '') => {
    return buildModePath(targetMode, path);
  };

  return {
    mode,
    getPath,
    getPathForMode,
    // Convenience paths
    homePath: getPath(''),
    coursesPath: getPath('courses'),
    notesPath: getPath('notes'),
    blogPath: getPath('blog'),
    aboutPath: getPath('about'),
  };
}
