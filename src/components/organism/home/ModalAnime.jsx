import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

interface ModalPlayTrailerProps {
  trailer?: {
    embed_url: string
    image_url: string
    youtube_id: string
  }
  open: boolean
  onClose: () => void
}

const ModalPlayTrailer: React.FC<ModalPlayTrailerProps> = ({ trailer, open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="relative w-full h-0 pb-[56.25%]"> 
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={trailer?.embed_url}
            title="YouTube Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalPlayTrailer