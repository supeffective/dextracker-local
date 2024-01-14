import { SettingsIcon } from '@/lib/icons/actions'
import { cn } from '@/lib/utils'
import DrawerMenu, { DrawerMenuProps } from '../primitives/DrawerMenu'
import AppVersionItem from './actions/AppVersionItem'
import DataDownloadJsonAction from './actions/DataDownloadJsonAction'
import DataUploadJsonAction from './actions/DataUploadJsonAction'

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
      <DataDownloadJsonAction />
      <DataUploadJsonAction />
      <hr />
      <AppVersionItem />
    </DrawerMenu>
  )
}
