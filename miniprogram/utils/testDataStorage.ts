// 测试数据存储接口
// 用于在测试环境下将用户操作记录在内存中，保证数据持久化

import dataService from '../app'

// 操作类型枚举
export enum OperationType {
  LIKE_TOPIC = 'like_topic',
  LIKE_COMMENT = 'like_comment',
  CREATE_TOPIC = 'create_topic',
  CREATE_COMMENT = 'create_comment',
  VOTE = 'vote',
  FOLLOW = 'follow',
  FAVORITE = 'favorite',
  SEARCH = 'search',
  VIEW_TOPIC = 'view_topic'
}

// 操作记录接口
interface OperationRecord {
  id: string
  type: OperationType
  userId: string
  targetType: string
  targetId: string
  data: any
  timestamp: number
  success: boolean
}

// 测试数据存储类
class TestDataStorage {
  private operationRecords: OperationRecord[] = []
  private isEnabled: boolean = true

  // 启用/禁用测试数据存储
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
    console.log(`📊 测试数据存储 ${enabled ? '已启用' : '已禁用'}`)
  }

  // 记录操作
  recordOperation(
    type: OperationType,
    userId: string,
    targetType: string,
    targetId: string,
    data: any = null,
    success: boolean = true
  ) {
    if (!this.isEnabled) return

    const record: OperationRecord = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      userId,
      targetType,
      targetId,
      data,
      timestamp: Date.now(),
      success
    }

    this.operationRecords.push(record)
    console.log(`📝 记录操作: ${type}`, record)
  }

  // 获取操作记录
  getOperationRecords(): OperationRecord[] {
    return [...this.operationRecords]
  }

  // 获取用户操作记录
  getUserOperations(userId: string): OperationRecord[] {
    return this.operationRecords.filter(record => record.userId === userId)
  }

  // 获取特定类型的操作记录
  getOperationsByType(type: OperationType): OperationRecord[] {
    return this.operationRecords.filter(record => record.type === type)
  }

  // 清空操作记录
  clearRecords() {
    this.operationRecords = []
    console.log('🗑️ 已清空所有操作记录')
  }

  // 导出操作记录
  exportRecords() {
    return {
      records: this.operationRecords,
      summary: {
        total: this.operationRecords.length,
        byType: this.getOperationTypeSummary(),
        byUser: this.getUserSummary()
      }
    }
  }

  // 获取操作类型统计
  private getOperationTypeSummary() {
    const summary: { [key: string]: number } = {}
    this.operationRecords.forEach(record => {
      summary[record.type] = (summary[record.type] || 0) + 1
    })
    return summary
  }

  // 获取用户统计
  private getUserSummary() {
    const summary: { [key: string]: number } = {}
    this.operationRecords.forEach(record => {
      summary[record.userId] = (summary[record.userId] || 0) + 1
    })
    return summary
  }
}

// 创建全局实例
const testDataStorage = new TestDataStorage()

// 导出便捷方法
export function recordOperation(
  type: OperationType,
  userId: string,
  targetType: string,
  targetId: string,
  data: any = null,
  success: boolean = true
) {
  testDataStorage.recordOperation(type, userId, targetType, targetId, data, success)
}

export function getCurrentUserOperations() {
  const currentUser = dataService.getCurrentUser()
  return testDataStorage.getUserOperations(currentUser.id)
}

export function exportTestData() {
  return testDataStorage.exportRecords()
}

export function clearTestData() {
  testDataStorage.clearRecords()
}

export function enableTestDataStorage(enabled: boolean) {
  testDataStorage.setEnabled(enabled)
}

// 导出默认实例
export default testDataStorage