import Control from 'react-leaflet-custom-control'

type ControlProps = Parameters<typeof Control>[0]

interface MapControl extends ControlProps {}

export const MapControl: React.FC<React.PropsWithChildren<MapControl>> = ({
  children,
  ...other
}) => {
  return (
    <Control {...other}>
      <div className="leaflet-bar">{children}</div>
    </Control>
  )
}
