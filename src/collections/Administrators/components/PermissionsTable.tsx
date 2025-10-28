'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import './PermissionsTable.css'

interface Permission {
  collection: string
  actions: string[]
  id?: string
}

export const PermissionsTable: React.FC<{ path: string }> = ({ path }) => {
  const { value } = useField<Permission[]>({ path })

  if (!value || value.length === 0) {
    return (
      <div className="permissions-table-empty">
        <p>No permissions assigned yet. Add permissions using the form above.</p>
      </div>
    )
  }

  return (
    <div className="permissions-table-wrapper">
      <h3>Permissions Summary</h3>
      <table className="permissions-table">
        <thead>
          <tr>
            <th>Collection</th>
            <th>Create</th>
            <th>Read</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {value.map((permission, index) => {
            const hasCreate = permission.actions?.includes('create')
            const hasRead = permission.actions?.includes('read')
            const hasUpdate = permission.actions?.includes('update')
            const hasDelete = permission.actions?.includes('delete')

            return (
              <tr key={permission.id || index}>
                <td className="collection-name">
                  {permission.collection || 'Unknown'}
                </td>
                <td className="permission-cell">
                  {hasCreate ? (
                    <span className="check-mark">✓</span>
                  ) : (
                    <span className="cross-mark">✗</span>
                  )}
                </td>
                <td className="permission-cell">
                  {hasRead ? (
                    <span className="check-mark">✓</span>
                  ) : (
                    <span className="cross-mark">✗</span>
                  )}
                </td>
                <td className="permission-cell">
                  {hasUpdate ? (
                    <span className="check-mark">✓</span>
                  ) : (
                    <span className="cross-mark">✗</span>
                  )}
                </td>
                <td className="permission-cell">
                  {hasDelete ? (
                    <span className="check-mark">✓</span>
                  ) : (
                    <span className="cross-mark">✗</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
