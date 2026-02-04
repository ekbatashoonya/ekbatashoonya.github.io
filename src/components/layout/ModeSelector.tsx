import { useMode } from '@/contexts/ModeContext';
import { MODE_ORDER, MODES } from '@/lib/modes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export function ModeSelector() {
  const { mode, switchMode } = useMode();

  return (
    <Select value={mode} onValueChange={switchMode}>
      <SelectTrigger className="w-[160px] sm:w-[180px]" aria-label="Select language mode">
        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {MODE_ORDER.map((modeId) => {
          const config = MODES[modeId];
          return (
            <SelectItem key={modeId} value={modeId}>
              <span className="flex items-center gap-2">
                <span>{config.label}</span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
