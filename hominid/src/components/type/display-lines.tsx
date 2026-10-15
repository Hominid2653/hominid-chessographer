import type { DisplayLine } from '@/content/types'
import { cn } from '@/lib/utils'

export function DisplayLines({ lines }: { lines: DisplayLine[] }) {
  return lines.map((line, index) => (
    <span key={`${line.text}-${index}`} className={cn('block', line.italic && 'italic')}>
      {line.text}
    </span>
  ))
}
