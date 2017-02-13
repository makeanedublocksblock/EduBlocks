def distance_to_player(x, y, z):
  global mc
  pp = mc.player.getPos()
  xd = x - pp.x
  yd = y - pp.y
  zd = z - pp.z
  return math.sqrt((xd * xd) + (yd * yd) + (zd * zd))
