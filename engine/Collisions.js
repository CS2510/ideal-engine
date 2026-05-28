// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.

class Collisions {
    static isOverlapPointVertices(point, vertices) {
        return point >= Math.min(...vertices) && point <= Math.max(...vertices)
    }

    static isOverlapPointVerticesDirection(point, vertices, direction) {
        const pointProjection = point.dot(direction)
        const vertexProjections = []
        for (const vertex of vertices) {
            vertexProjections.push(vertex.dot(direction))
        }
        return Collisions.isOverlapPointVertices(pointProjection, vertexProjections)
    }

    static isOverlap(point, vertices) {
        for (let i = 0; i < vertices.length; i++) {
            const one = vertices[i]
            const two = vertices[(i + 1) % vertices.length]
            const edge = one.minus(two)
            const edgeNormalized = edge.normalized()
            const direction = edgeNormalized.orthogonal()

            const result = Collisions.isOverlapPointVerticesDirection(point, vertices, direction)
            if (!result) return false
        }
        return true
    }

    static isCollision(point, gameObject) {
        const polygon = gameObject.getComponent(Polygon)
        const transformedPoints = []
        for (const point of polygon.points) {
            transformedPoints.push(point.add(gameObject.transform.position))
        }
        return Collisions.isOverlap(point, transformedPoints)
    }
}

console.log(Collisions.isOverlapPointVertices(3, [5, 6, 4, 13, 12]))
console.log(Collisions.isOverlapPointVerticesDirection(new Vector2(0, 5), [
    new Vector2(0, 0), new Vector2(10, 0), new Vector2(5, 5)
], new Vector2(0, 1)))