// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

class Collisions {
    static isOverlapPointVertices(point, vertices) {
        if (!(point >= Math.min(...vertices) && point <= Math.max(...vertices))) {
            return false
        }
        return Math.min((point - Math.min(...vertices)), (Math.max(...vertices) - point))
    }

    static isOverlapVerticesVertices(a, b) {
        if (Math.min(...a) > Math.max(...b) || Math.min(...b) > Math.max(...a)) return false
        return Math.min(Math.max(...a) - Math.min(...b), Math.max(...b) - Math.min(...a))
    }

    static isOverlapPointVerticesDirection(point, vertices, direction) {
        const pointProjection = point.dot(direction)
        const vertexProjections = []
        for (const vertex of vertices) {
            vertexProjections.push(vertex.dot(direction))
        }
        const result = Collisions.isOverlapPointVertices(pointProjection, vertexProjections)
        if (!result) return false
        return direction.normalized().times(result)
    }

    static isOverlapVerticesVerticesDirection(a, b, direction) {
        const projectionA = a.map(p => p.dot(direction))
        const projectionB = b.map(p => p.dot(direction))
        const result = Collisions.isOverlapVerticesVertices(projectionA, projectionB)
        if (!result) return false
        return direction.normalized().times(result)
    }

    static isOverlap(point, vertices) {
        let shortestVector = new Vector2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
        for (let i = 0; i < vertices.length; i++) {
            const one = vertices[i]
            const two = vertices[(i + 1) % vertices.length]
            const edge = one.minus(two)
            const edgeNormalized = edge.normalized()
            const direction = edgeNormalized.orthogonal()

            const result = Collisions.isOverlapPointVerticesDirection(point, vertices, direction)
            if (!result) return false
            if (result.magnitude < shortestVector.magnitude) {
                shortestVector = result
            }
        }
        return shortestVector
    }

    static isOverlapVertices(a, b) {
        let shortestVector = new Vector2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
        for (const vertices of [a, b]) {
            for (let i = 0; i < vertices.length; i++) {
                const one = vertices[i]
                const two = vertices[(i + 1) % vertices.length]
                const edge = one.minus(two)
                const edgeNormalized = edge.normalized()
                const direction = edgeNormalized.orthogonal()

                const result = Collisions.isOverlapVerticesVerticesDirection(a, b, direction)
                if (!result) return false
                if (result.magnitude < shortestVector.magnitude) {
                    shortestVector = result
                }
            }
        }
        return shortestVector
    }

    static isCollisionPointGameObject(point, gameObject) {
        const polygon = gameObject.getComponent(Collider)
        const transformedPoints = []
        for (const point of polygon.points) {
            transformedPoints.push(point.add(gameObject.transform.position))
        }
        let result = Collisions.isOverlap(point, transformedPoints)
        if (!result) return false

        let a = point.minus(gameObject.transform.position)
        let dot = a.dot(result)
        if (dot < 0) return result.times(-1)
        return result
    }

    static isCollisionGameObjectGameObject(a, b){
        const transformedA = a.getComponent(Collider).points.map(p=>p.add(a.transform.position))
        const transformedB = b.getComponent(Collider).points.map(p=>p.add(b.transform.position))
        let result = Collisions.isOverlapVertices(transformedA, transformedB)
        if (!result) return false

        let temp = a.transform.position.minus(b.transform.position)
        let dot = temp.dot(result)
        if (dot < 0) return result.times(-1)
        return result
    }
}

// console.log(Collisions.isOverlapPointVertices(3, [5, 6, 4, 13, 12]))
// console.log(Collisions.isOverlapPointVerticesDirection(new Vector2(0, 5), [
//     new Vector2(0, 0), new Vector2(10, 0), new Vector2(5, 5)
// ], new Vector2(0, 1)))