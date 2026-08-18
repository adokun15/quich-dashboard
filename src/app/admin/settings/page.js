import ManageSettings from "@/components/ManageSettings";

/*
import { useLinkStatus } from 'next/link'
function Hint() {
  const { pending } = useLinkStatus()
  return (
    <span aria-hidden className={`link-hint ${pending ? 'is-pending' : ''}`} />
  )
}*/

export default function SettingsPage() {
  return <ManageSettings />;
}
