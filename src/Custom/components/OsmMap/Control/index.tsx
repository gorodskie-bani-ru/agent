import Control from 'react-leaflet-custom-control'

type ControlProps = Parameters<typeof Control>[0]

export const MapControl: React.FC<React.PropsWithChildren<ControlProps>> = ({
  children,
  ...other
}) => {
  return (
    <Control {...other}>
      <div className="leaflet-bar">{children}</div>
    </Control>
  )
}
