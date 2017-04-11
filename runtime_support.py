import time

def distance_to_player(x, y, z):
  global mc, math
  pp = mc.player.getPos()
  xd = x - pp.x
  yd = y - pp.y
  zd = z - pp.z
  return math.sqrt((xd * xd) + (yd * yd) + (zd * zd))

import random
from psonic import *
from threading import Thread, Condition, Event

def live_loop_1():
    pass

def live_loop_2():
    pass

def live_loop_3():
    pass

def live_loop_4():
    pass

def live_loop_1a(condition,stop_event):
    while not stop_event.is_set():
        with condition:
            condition.notifyAll() #Message to threads
        live_loop_1()

def live_loop_2a(condition,stop_event):
    while not stop_event.is_set():
        with condition:
            condition.wait() #Wait for message
        live_loop_2()

def live_loop_3a(condition,stop_event):
    while not stop_event.is_set():
        with condition:
            condition.wait() #Wait for message
        live_loop_3()

def live_loop_4a(condition,stop_event):
    while not stop_event.is_set():
        with condition:
            condition.wait() #Wait for message
        live_loop_4()

condition = Condition()
stop_event = Event()
live_thread_1 = Thread(name='producer', target=live_loop_1a, args=(condition,stop_event))
live_thread_2 = Thread(name='consumer1', target=live_loop_2a, args=(condition,stop_event))
live_thread_3 = Thread(name='consumer2', target=live_loop_3a, args=(condition,stop_event))
live_thread_4 = Thread(name='consumer3', target=live_loop_4a, args=(condition,stop_event))

live_thread_1.start()
live_thread_2.start()
live_thread_3.start()
live_thread_4.start()


def buildPumpkin(x, y, z):
  mc.setBlocks(x-2, y-2, z-2, x+2, y+2, z+2, 35, 1)
  mc.setBlocks(x-1, y-1, z-1, x+1, y+1, z+1, 0, 1)
  mc.setBlock(x-1, y+1, z-2, 0)
  mc.setBlock(x+1, y+1, z-2, 0)

  mc.setBlocks(x+1, y-1, z-2, x-1, y-1, z-2, 0, 0)
  mc.setBlock(x-1, y+1, z+2, 0)
  mc.setBlock(x+1, y+1, z+2, 0)

  mc.setBlocks(x+1, y-1, z+2, x-1, y-1, z+2, 0, 0)
  mc.setBlock(x-2, y+1, z-1, 0)
  mc.setBlock(x-2, y+1, z+1, 0)

  mc.setBlocks(x-2, y-1, z+1, x-2, y-1, z-1, 0, 0)
  mc.setBlock(x+2, y+1, z-1, 0)
  mc.setBlock(x+2, y+1, z+1, 0)

  mc.setBlocks(x+2, y-1, z+1, x+2, y-1, z-1, 0, 0)
  mc.setBlock(x, y+3, z, 35, 5)

old_print = print

# Overload print so that we can't hammer the standard output.
# Print is limited to 1 line every 10 seconds.
def print(*args):
  old_print(*args)
  time.sleep(0.10)

print('Starting...')
