import { User, groups } from '@prisma/client'
import ProfileForm from '@/features/ProfileForm'

const ProfilePage = async () => {
  const resGroups = await fetch(`${process.env.NEXTAUTH_URL}/api/groups`)
  const groups: groups[] = await resGroups.json()

  const groupOptions = groups.map((group) => ({
    label: (
      <div className="w-full">
        <strong>{group.name}</strong>
        <div className="flex w-full whitespace-normal">{group.description}</div>
      </div>
    ),
    value: group.id,
  }))

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">Profile</h1>

      <ProfileForm groupOptions={groupOptions} />
    </div>
  )
}

export default ProfilePage
