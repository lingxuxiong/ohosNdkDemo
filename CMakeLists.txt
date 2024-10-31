# 指定CMake的最小版本
CMAKE_MINIMUM_REQUIRED(VERSION 3.16)

# 工程名称，这里我们就叫HELLO
PROJECT(HELLO)

#添加一个子目录并构建该子目录。
ADD_SUBDIRECTORY(src)

MESSAGE(STATUS "Platform: ${CMAKE_SYSTEM_NAME}")

if(APPLE)
    MESSAGE("This is apple")
elseif(OHOS)
    MESSAGE("This is HarmonyOS")
elseif(WIN32)
    MESSAGE("This is Windows")
else()
    MESSAGE("Other")
endif()