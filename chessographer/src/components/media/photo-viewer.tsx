import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

type ViewPhoto = {
  image: string
  alt: string
  title: string
  caption?: string
}

export function PhotoViewer({
  photo,
  onClose,
}: {
  photo: ViewPhoto | null
  onClose: () => void
}) {
  return (
    <Dialog
      open={photo !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      {photo ? (
        <DialogContent variant="viewer">
          <img
            src={photo.image}
            alt={photo.alt}
            className="max-h-[74svh] w-full object-contain"
          />
          <DialogTitle className="mt-4 text-center font-serif text-3xl font-normal tracking-[-0.03em] text-white">
            {photo.title}
          </DialogTitle>
          <DialogDescription className="text-center text-[11px] tracking-[0.16em] text-white/70 uppercase">
            {photo.caption ?? photo.alt}
          </DialogDescription>
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
