import { SettingsIcon } from '@/lib/icons/actions'
import { cn } from '@/lib/utils'
import DrawerMenu, { DrawerMenuProps } from '../primitives/DrawerMenu'
import AppVersionItem from './AppVersionItem'
import DataDownloadJsonAction from './DataDownloadJsonAction'
import DataUploadJsonAction from './DataUploadJsonAction'

export default function SettingsDrawer({ className, children, ...props }: DrawerMenuProps) {
  return (
    <DrawerMenu
      className={cn(className)}
      placement="right"
      icon={<SettingsIcon />}
      buttonName="settings"
      buttonTitle="Settings"
      {...props}
    >
      {children}
      <hr />
      <DataDownloadJsonAction />
      <DataUploadJsonAction />
      <hr />
      <AppVersionItem />
    </DrawerMenu>
  )
}
