// React Imports
import React, { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CustomAvatar from '../../@core/comp/mui/Avatar'
import PollIcon from '@mui/icons-material/Poll'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'

// CardStatVertical Component
const CardStatVertical = (props) => {
  // Destructure Props
  const { title, stats, avatarIcon, avatarColor, trendNumber, trend, subtitle, avatarSkin, avatarSize, moreOptions } = props
  
  // Menu state
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const renderAvatarIcon = () => {
    if (avatarIcon === 'poll') {
      return  <PollIcon
      sx={{
        fontSize: avatarSize,  
        color: avatarColor === 'primary' ? 'primary.main' : 'secondary.main', 
        backgroundColor: 'background.paper', 
        borderRadius: '100%', 
        padding: '5px', 
      }}
    />
    } else if (avatarIcon === 'currency') {
      return <CurrencyRupeeIcon />
    } else {
      return null // Default or fallback icon if needed
    }
  }


  return (
    <Card className='bs-full'>
      <CardContent>
        <div className='flex justify-between items-center is-full mbe-5'>
          <CustomAvatar color={avatarColor} skin={avatarSkin} size={avatarSize} className='shadow-xs'>
          {renderAvatarIcon()}
          </CustomAvatar>
          <div>
            <IconButton onClick={handleClick} className='text-textPrimary'>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {(moreOptions || ['Refresh', 'Share', 'Update']).map((option, index) => (
                <MenuItem key={index} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <Typography color='text.primary' className='font-medium'>
            {title}
          </Typography>
          <div className='flex gap-x-2 gap-y-0.5 items-center flex-wrap'>
            <Typography variant='body4'>{stats}</Typography>
            <Typography color={trend === 'negative' ? 'error.main' : 'success.main'}>
              {`${trend === 'negative' ? '-' : '+'}${trendNumber}`}
            </Typography>
          </div>
          <Typography variant='body2' className='opacity text-gray-600'>{subtitle}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStatVertical
