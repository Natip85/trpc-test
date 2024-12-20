'use client'

import {useUser} from '@/hooks/use-user'
import {hasPermission} from '@/lib/permissions'
import {type UserProfileForm, userProfileFormSchema} from '@/server/db/user-types'
import {api} from '@/trpc/react'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/ui/form'
import {Input} from '@/ui/input'
import {Button} from '@/ui/button'

interface ProfileEditFormProps {
  user: UserProfileForm
}
export default function ProfileEditForm({user}: ProfileEditFormProps) {
  const {mutateAsync: updateUser, isPending: isLoading} = api.users.updateMe.useMutation()
  const {user: AuthUser} = useUser()
  const form = useForm<UserProfileForm>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: user,
  })

  const onSubmit = async (values: UserProfileForm) => {
    if (!hasPermission({...AuthUser, roles: AuthUser.roles ?? []}, 'users', 'edit', values)) {
      return
    }
    const updatedUser = await updateUser(values)
    form.reset(updatedUser)
  }

  return (
    <div className='flex-1 p-2 md:p-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <FormControl>
                  <Input id='name' {...field} value={field.value ?? ''} placeholder='Name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <FormControl>
                  <Input disabled id='email' {...field} placeholder='Email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
              control={form.control}
              name='phone'
              render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor='phone'>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput id='phone' {...field} value={field.value ?? ''} placeholder='Phone' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='language'
              render={({field}) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => form.setValue('language', value as UserLanguage)}
                      value={field.value}
                    >
                      <SelectTrigger className={cn('justify-between', !field.value && 'text-muted-foreground')}>
                        {field.value
                          ? languages.find((language) => language.value === field.value)?.label
                          : 'Select language'}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {languages.map((language) => (
                            <SelectItem value={language.value} key={language.value}>
                              {language.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          <div>
            <Button disabled={isLoading} type='submit'>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
