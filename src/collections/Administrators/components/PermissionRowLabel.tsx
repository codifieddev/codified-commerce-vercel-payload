'use client'

import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

interface PermissionRowData {
  collection?: string
  actions?: string[]
}

const PermissionRowLabel: React.FC = () => {
  const { data } = useRowLabel<PermissionRowData>()

  const collectionName = data?.collection || 'No Collection'
  const actions = data?.actions || []
  
  const actionsText = actions.length > 0 
    ? actions.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ') 
    : 'No Actions'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <strong style={{ textTransform: 'capitalize' }}>{collectionName}</strong>
      <span style={{ color: '#666', fontSize: '14px' }}>→ {actionsText}</span>
    </div>
  )
}

export default PermissionRowLabel
